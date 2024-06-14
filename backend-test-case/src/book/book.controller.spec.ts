// import { Test, TestingModule } from '@nestjs/testing';
// import { BookController } from './book.controller';
// import { BookService } from './book.service';
// import { PrismaService } from '../../src/prisma/prisma/prisma.service';

// describe('BookController', () => {
//   let controller: BookController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [BookController],
//       providers: [BookService, PrismaService],
//     }).compile();

//     controller = module.get<BookController>(BookController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BorrowReturnBookDto } from './dto/borrow-return-book.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            borrowBook: jest.fn(),
            returnBook: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all books', async () => {
      const books = [
        { id: 1, code: 'B001', title: 'Book 1', author: 'Jhon Doe', stock: 5 },
        { id: 2, code: 'B002', title: 'Book 2', author: 'Jane Doe', stock: 3 },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(books);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'success get All books!',
        data: books,
      });
    });
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto = {
        id: 1,
        code: 'B003',
        title: 'Harry Potter',
        stock: 3,
        author: 'John Doe',
      };
      jest.spyOn(service, 'create').mockResolvedValue(createBookDto);

      const result = await controller.create(createBookDto);

      expect(service.create).toHaveBeenCalledWith(createBookDto);
      expect(result).toEqual({
        message: 'create book successfully!',
        data: createBookDto,
      });
    });
  });

  describe('borrowBook', () => {
    it('should borrow a book successfully', async () => {
      const borrowBookDto: BorrowReturnBookDto = {
        memberCode: 'M001',
        bookCode: 'B001',
      };

      const borrowDate = new Date();
      jest.spyOn(service, 'borrowBook').mockResolvedValue({
        message: 'Book borrowed successfully!',
        data: {
          id: 1,
          memberId: 1,
          bookId: 1,
          borrowDate,
          returnDate: null,
        },
      });

      const result = await controller.borrowBook(borrowBookDto);

      expect(service.borrowBook).toHaveBeenCalledWith(borrowBookDto);
      expect(result).toEqual({
        message: 'Book borrowed successfully!',
        data: {
          id: 1,
          memberId: 1,
          bookId: 1,
          borrowDate,
          returnDate: null,
        },
      });
    });
  });

  describe('returnBook', () => {
    it('should return a book successfully', async () => {
      const returnBookDto: BorrowReturnBookDto = {
        memberCode: 'M001',
        bookCode: 'B001',
      };
      jest.spyOn(service, 'returnBook').mockResolvedValue({
        message: 'Book returned successfully!',
        data: {
          id: 1,
          memberId: 1,
          bookId: 1,
          borrowDate: new Date('2024-01-01T00:00:00.000Z'),
          returnDate: new Date('2024-01-20T00:00:00.000Z'),
        },
      });

      const result = await controller.returnBook(returnBookDto);

      expect(service.returnBook).toHaveBeenCalledWith(returnBookDto);
      expect(result).toEqual({
        message: 'Book returned successfully!',
        data: {
          id: 1,
          memberId: 1,
          bookId: 1,
          borrowDate: new Date('2024-01-01T00:00:00.000Z'),
          returnDate: new Date('2024-01-20T00:00:00.000Z'),
        },
      });
    });
  });
});
