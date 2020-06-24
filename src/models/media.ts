import {
  attribute,
  autoGeneratedHashKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';

import { AbstractModel } from './abstract';

export enum MediaTypes {
  'PHOTO',
  'VIDEO'
}

@table(process.env.DYNAMODB_TABLE_MEDIA)
export class Media extends AbstractModel {
  @autoGeneratedHashKey()
  id: string;

  @attribute()
  type: MediaTypes;

  @attribute()
  locationId: string;

  @attribute()
  userId: string;

  @attribute()
  deviceId: string;
}