
import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import { WorkflowHero } from '@/components/Workflow/WorkflowHero';
import { timelineData } from '@/components/Workflow/timelineData';

const WorkflowPage: React.FC = () => {
  return (
    <div className="pt-32">
      <WorkflowHero />
      
      {/* Timeline Section */}
      <section className="relative">
        <Timeline data={timelineData} />
      </section>
    </div>
  );
};

export default WorkflowPage;
