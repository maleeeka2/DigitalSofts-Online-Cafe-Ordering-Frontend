import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    load_test: {
      executor: 'ramping-vus',
      startVUs: 0,

      stages: [
        { duration: '30s', target: 50 },
        { duration: '1m', target: 50 },

        { duration: '30s', target: 100 },
        { duration: '1m', target: 100 },

        { duration: '1m', target: 500 },
        { duration: '1m', target: 500 },

        { duration: '30s', target: 0 },
      ],

      gracefulRampDown: '30s',
    },
  },

  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000'],
  },
};

const BASE_URL =
  __ENV.BASE_URL || 'http://127.0.0.1:5000';

export default function () {
  const health = http.get(`${BASE_URL}/api/health`);

  check(health, {
    'health returns 200': (r) => r.status === 200,
    'health returns JSON': (r) =>
      r.headers['Content-Type'] &&
      r.headers['Content-Type'].includes('application/json'),
  });

  const menu = http.get(`${BASE_URL}/api/menu`);

  check(menu, {
    'menu returns 200': (r) => r.status === 200,
    'menu returns JSON': (r) =>
      r.headers['Content-Type'] &&
      r.headers['Content-Type'].includes('application/json'),
    'menu returns items': (r) => {
      try {
        const data = r.json();
        return Array.isArray(data) && data.length > 0;
      } catch {
        return false;
      }
    },
  });

  sleep(1);
}