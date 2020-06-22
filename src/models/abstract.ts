import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper, PutOptions } from '@aws/dynamodb-data-mapper';
import {
  GetParameters,
  ParallelScanWorkerParameters,
  ScanParameters,
} from '@aws/dynamodb-data-mapper/build/namedParameters';
import { ScanIterator } from '@aws/dynamodb-data-mapper/build/ScanIterator';
import { attribute } from '@aws/dynamodb-data-mapper-annotations';

const client = new DynamoDB();
const mapper = new DataMapper({ client });

export class AbstractModel {
  @attribute({ defaultProvider: () => new Date() })
  createdAt: Date;

  @attribute()
  updatedAt: Date;

  static async get<T>(parameters: GetParameters<T>): Promise<T> {
    return mapper.get<T>(parameters);
  }

  static scan<T>(parameters: ScanParameters<T> | ParallelScanWorkerParameters<T>): ScanIterator<T> {
    return mapper.scan<T>(parameters);
  }

  async put<T>(options?: PutOptions) {
    this.updatedAt = new Date();

    return mapper.put<T>(this as any, options);
  }
}
