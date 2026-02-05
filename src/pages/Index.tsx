import { MainLayout } from "@/components/layout/MainLayout";
import { WorkStatistics } from "@/components/dashboard/WorkStatistics";
import { DueTasks } from "@/components/dashboard/DueTasks";
import { DueAppointments } from "@/components/dashboard/DueAppointments";
import { WorkCalendar } from "@/components/dashboard/WorkCalendar";

const Index = () => {
  return (
    <MainLayout showFilters={false} showActivity={false}>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your work overview.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Statistics & Lists */}
          <div className="lg:col-span-2 space-y-6">
            {/* Work Statistics */}
            <WorkStatistics />

            {/* Due Tasks & Appointments Row */}
            <div className="grid gap-6 md:grid-cols-2">
              <DueTasks />
              <DueAppointments />
            </div>
          </div>

          {/* Right Column - Work Calendar */}
          <div className="lg:col-span-1">
            <WorkCalendar />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
