import { PipelineStage } from 'mongoose';

export function getMostPollutedParisTimeAggregationPipeline(): PipelineStage[] {
  return [
    { $match: { city: 'Paris' } },
    { $sort: { 'pollution.aqius': -1 } },
    { $limit: 1 },
    {
      $project: {
        _id: 0,
        'pollution.aqius': 1,
        'pollution.ts': 1,
      },
    },
  ];
}
