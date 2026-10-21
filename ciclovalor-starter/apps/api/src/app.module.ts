import { Controller, Get, Inject, Injectable, Module } from '@nestjs/common';
import { homeData, type HomeData } from '../../../shared/home-data';
@Injectable()
class HomeService { getHome(): HomeData { return homeData; } }
@Controller()
class HomeController {
  constructor(@Inject(HomeService) private readonly homeService: HomeService) {}
  @Get('home') home(): HomeData { return this.homeService.getHome(); }
  @Get('health') health() { return { status: 'ok', service: 'ciclovalor-api', mode: 'demo' }; }
}
@Module({controllers:[HomeController],providers:[HomeService]})
export class AppModule {}
