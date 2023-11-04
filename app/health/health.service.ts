import { Injectable } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private dbChecker: TypeOrmHealthIndicator,
  ) {}

  healthCheck(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      (): Promise<HealthIndicatorResult> =>
        this.dbChecker.pingCheck('database'),
    ]);
  }

  externalServiceHealth(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([]);
  }
}
