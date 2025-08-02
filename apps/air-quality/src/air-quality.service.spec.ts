import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityService } from './air-quality.service';
import { AirQualityRepository } from './air-quality.repository';
import { IqAirService } from 'common/common';
import { AirQualityDTO } from './dtos/air-quality.dto';
import { LocationDto } from './dtos/location.dto';

describe('AirQualityService', () => {
  let service: AirQualityService;
  let repository: jest.Mocked<AirQualityRepository>;
  let iqAirService: jest.Mocked<IqAirService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirQualityService,
        {
          provide: AirQualityRepository,
          useValue: {
            create: jest.fn(),
            aggregate: jest.fn(),
          },
        },
        {
          provide: IqAirService,
          useValue: {
            getAirQuality: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AirQualityService>(AirQualityService);
    repository = module.get(AirQualityRepository);
    iqAirService = module.get(IqAirService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAirQualities', () => {
    it('should return pollution data', async () => {
      const mockPollution = { aqi: 42 };
      iqAirService.getAirQuality.mockResolvedValue({
        pollution: mockPollution,
        city: 'Paris',
        location: {
          type: 'POINT',
          coordinates: [2.33, 4.77],
        },
      });

      const result = await service.getAirQualities({
        lat: 2.3,
        lng: 48.8,
      } as LocationDto);

      expect(iqAirService.getAirQuality).toHaveBeenCalledWith(2.3, 48.8);
      expect(result).toEqual(mockPollution);
    });
  });

  describe('saveAirQuality', () => {
    it('should save air quality data to repository', async () => {
      const dto: AirQualityDTO = {
        city: 'Paris',
        lat: 48.8,
        lng: 2.3,
        pollution: {
          ts: new Date(),
          aqius: 25,
          mainus: 'p2',
          aqicn: 18,
          maincn: 'o3',
        },
      };

      await service.saveAirQuality(dto);

      expect(repository.create).toHaveBeenCalledWith({
        city: dto.city,
        pollution: dto.pollution,
        location: {
          type: 'Point',
          coordinates: [dto.lng, dto.lat],
        },
      });
    });
  });

  describe('getMostPollutedParisTime', () => {
    it('should return the most polluted Paris time', async () => {
      const mockDoc = { time: '12:00', aqi: 120 };
      repository.aggregate.mockResolvedValue([mockDoc]);

      const result = await service.getMostPollutedParisTime();

      expect(repository.aggregate).toHaveBeenCalled();
      expect(result).toEqual(mockDoc);
    });
  });
});
