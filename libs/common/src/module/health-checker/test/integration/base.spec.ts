import { Test, TestingModule } from '@nestjs/testing';
import { HealthModule } from '@libs/common/src/module/health-checker/health-module';

describe('base Test file for specific module', () => {
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();
  });

  beforeEach(async () => {});
  afterEach(async () => {});

  it('unit.test', () => {
    expect(moduleFixture).toBeDefined();
  });
});
