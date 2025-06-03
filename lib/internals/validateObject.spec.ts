import 'reflect-metadata';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import * as lp from './loadPackage';
import { validateObject } from './validateObject';

describe('validateObject', () => {
  it('Should return the value if "class-validator" is not being used.', async () => {
    const spy = jest
      .spyOn(lp, 'loadPackage')
      .mockImplementation((name: string) => (name === 'class-validator' ? false : require(name)));

    class Dto {
      @IsNotEmpty()
      public email!: string;
    }

    const result = await validateObject(Dto, { secondaryEmail: 'hellow.ashutosh@gmail.com' });

    expect(result).toHaveProperty('secondaryEmail', 'hellow.ashutosh@gmail.com');

    spy.mockRestore();
  });

  it('Should return the value if "class-transformer" is not being used.', async () => {
    const spy = jest
      .spyOn(lp, 'loadPackage')
      .mockImplementation((name: string) => (name === 'class-transformer' ? false : require(name)));

    class Dto {
      @IsNotEmpty()
      public email!: string;
    }

    const result = await validateObject(Dto, { secondaryEmail: 'hellow.ashutosh@gmail.com' });

    expect(result).toHaveProperty('secondaryEmail', 'hellow.ashutosh@gmail.com');

    spy.mockRestore();
  });

  it('Should return only exposed properties.', async () => {
    class Dto {
      @Expose()
      @IsNotEmpty()
      public email!: string;
    }

    const result = await validateObject(
      Dto,
      { email: 'hellow.ashutosh@gmail.com', secondaryEmail: 'ashutoshpythoncs@gmail.com' },
      {
        transformOptions: { excludeExtraneousValues: true }
      }
    );

    expect(result).toHaveProperty('email', 'hellow.ashutosh@gmail.com');
    expect(result).not.toHaveProperty('secondaryEmail', 'ashutoshpythoncs@gmail.com');
  });
});
