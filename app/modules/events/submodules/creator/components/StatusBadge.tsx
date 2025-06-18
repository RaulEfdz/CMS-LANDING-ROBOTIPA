import React from 'react';

type EventStatus = 'initialized' | 'in_process' | 'completed' | 'abandoned';

type StatusBadgeProps = {
  status: EventStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  let bgColor = 'bg-gray-200';
  switch (status) {
    case 'initialized':
      bgColor = 'bg-blue-200';
      break;
    case 'in_process':
      bgColor = 'bg-yellow-200';
      break;
    case 'completed':
      bgColor = 'bg-green-200';
      break;
    case 'abandoned':
      bgColor = 'bg-red-200';
      break;
  }
  return (
    <span className={`px-2 py-1 text-xs rounded ${bgColor}`}>
      {status}
    </span>
  );
}
