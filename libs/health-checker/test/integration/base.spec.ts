import { Test, TestingModule } from '@nestjs/testing';
import { RootModule } from '../../../../app/root.module';

describe('base Test file for specific module', () => {
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [RootModule],
    }).compile();
  });

  beforeEach(async () => {});
  afterEach(async () => {});

  it('unit.test', () => {
    expect(moduleFixture).toBeDefined();
  });
});
