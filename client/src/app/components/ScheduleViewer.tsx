import { Schedule } from '@/types/stationTypes';

interface ScheduleViewerProps {
  viewOption: 'full' | 'single' | null;
  schedule: Schedule | null;
}

const ScheduleViewer = ({ viewOption, schedule }: ScheduleViewerProps) => {
  if (viewOption === null) {
    return null;
  }
  if (schedule === null) {
    return <div>There are currently no scheduled trips D:</div>;
  }

  const { serviceName, trips } = schedule as Schedule;

  if (viewOption === 'full') {
    return <div>FULL SCHEDULE</div>;
  }
  if (viewOption === 'single') {
    return <div>NEXT DEPARTURE</div>;
  }
};

export default ScheduleViewer;
