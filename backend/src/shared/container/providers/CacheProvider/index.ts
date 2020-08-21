import { container } from 'tsyringe';

// Implementations
import RedisChacheProvider from './implementations/RedisChacheProvider';

// interface
import ICacheProvider from './models/ICacheProvider';

const providers = {
  redis: RedisChacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
