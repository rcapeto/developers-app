import fileSystem from 'fs';
import path from 'path';

export type LoggerType = 'error' | 'success';

export const logger = (type: LoggerType, message: string) => {
  const log_file_path = path.resolve(__dirname, '..', '..', 'tmp', 'log.txt');

  const log = fileSystem.createWriteStream(log_file_path, {
    flags: 'a', //appending content = (old data will be preserved)
  });

  const date = new Date().toISOString();

  log.write(`\r\n[${date}] - TYPE: ${type} - ${message}`);
  log.end();
};
