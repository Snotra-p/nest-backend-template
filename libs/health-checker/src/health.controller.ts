import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @HealthCheck()
  @Get()
  health(): Promise<HealthCheckResult> {
    return this.healthService.healthCheck();
  }

  @HealthCheck()
  @Get('/external')
  externalHealth(): Promise<HealthCheckResult> {
    return this.healthService.externalServiceHealth();
  }
}
