import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import { LocationDto } from './dtos/location.dto';

describe('AirQualityController', () => {
  let controller: AirQualityController;
  let service: jest.Mocked<AirQualityService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirQualityController],
      providers: [
        {
          provide: AirQualityService,
          useValue: {
            getAirQualities: jest.fn(),
            saveAirQuality: jest.fn(),
            getMostPollutedParisTime: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AirQualityController>(AirQualityController);
    service = module.get(AirQualityService) as jest.Mocked<AirQualityService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAirQualities', () => {
    it('should return pollution data', async () => {
      const mockPollution = {
        ts: new Date(),
        aqius: 24,
        mainus: 'o3',
        aqicn: 18,
        maincn: 'o3',
      };
      service.getAirQualities.mockResolvedValue(mockPollution);

      const location: LocationDto = { lat: 48.8, lng: 2.3 };
      const result = await controller.getAirQualities(location);

      expect(service.getAirQualities).toHaveBeenCalledWith(location);
      expect(result).toEqual({ data: { pollution: mockPollution } });
    });
  });

  describe('getMostPollutedParisTime', () => {
    it('should return most polluted time data', async () => {
      const mockData = {
        pollution: {
          ts: new Date(),
          aqius: 39,
        },
      };
      service.getMostPollutedParisTime.mockResolvedValue(mockData);

      const result = await controller.getMostPollutedParis();

      expect(service.getMostPollutedParisTime).toHaveBeenCalled();
      expect(result).toEqual({ data: mockData });
    });
  });
});
