import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;

  const mockTicket = {
    film: '123e4567-e89b-12d3-a456-426614174000',
    session: '123e4567-e89b-12d3-a456-426614174001',
    daytime: '2024-01-01T12:00:00',
    row: 1,
    seat: 5,
    price: 500,
  };

  const mockOrderDto: CreateOrderDto = {
    email: 'user@example.com',
    phone: '+79001234567',
    tickets: [mockTicket],
  };

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should return order result with created tickets', async () => {
      const expected = {
        total: 1,
        items: [{ id: 'generated-uuid', ...mockTicket }],
      };
      mockOrderService.createOrder.mockResolvedValue(expected);

      const result = await controller.createOrder(mockOrderDto);

      expect(result).toEqual(expected);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(mockOrderDto);
    });

    it('should pass the order DTO to service without modification', async () => {
      mockOrderService.createOrder.mockResolvedValue({ total: 1, items: [] });

      await controller.createOrder(mockOrderDto);

      expect(mockOrderService.createOrder).toHaveBeenCalledTimes(1);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(mockOrderDto);
    });

    it('should propagate BadRequestException from service', async () => {
      mockOrderService.createOrder.mockRejectedValue(
        new BadRequestException({ error: 'No tickets provided' }),
      );

      await expect(controller.createOrder(mockOrderDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return correct total count matching number of tickets', async () => {
      const multiTicketOrder: CreateOrderDto = {
        ...mockOrderDto,
        tickets: [
          mockTicket,
          { ...mockTicket, seat: 6 },
        ],
      };
      const expected = {
        total: 2,
        items: [
          { id: 'uuid-1', ...mockTicket },
          { id: 'uuid-2', ...mockTicket, seat: 6 },
        ],
      };
      mockOrderService.createOrder.mockResolvedValue(expected);

      const result = await controller.createOrder(multiTicketOrder);

      expect(result.total).toBe(2);
      expect(result.items).toHaveLength(2);
    });
  });
});
