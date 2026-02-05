import { MainLayout } from "@/components/layout/MainLayout";
import { WorkStatistics } from "@/components/dashboard/WorkStatistics";
import { DueTasks } from "@/components/dashboard/DueTasks";
import { DueAppointments } from "@/components/dashboard/DueAppointments";
import { WorkCalendar } from "@/components/dashboard/WorkCalendar";
import { CustomerOverview } from "@/components/dashboard/CustomerOverview";
import { CustomerGrowthChart } from "@/components/dashboard/CustomerGrowthChart";
import { PurchasingGrowthChart } from "@/components/dashboard/PurchasingGrowthChart";
import { CustomerRevenueByType } from "@/components/dashboard/CustomerRevenueByType";
import { CustomersBySource } from "@/components/dashboard/CustomersBySource";
import { CustomersByType } from "@/components/dashboard/CustomersByType";
import { CustomerBirthdays } from "@/components/dashboard/CustomerBirthdays";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

        {/* Dashboard Tabs */}
        <Tabs defaultValue="work" className="w-full">
          <TabsList>
            <TabsTrigger value="work">Work Table</TabsTrigger>
            <TabsTrigger value="customer360">Customer 360</TabsTrigger>
          </TabsList>

          {/* Work Table Tab */}
          <TabsContent value="work" className="space-y-6 mt-6">
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
          </TabsContent>

          {/* Customer 360 Tab */}
          <TabsContent value="customer360" className="space-y-6 mt-6">
            {/* Customer Overview Stats */}
            <CustomerOverview />

            {/* Charts Row 1 */}
            <div className="grid gap-6 lg:grid-cols-3">
              <CustomerGrowthChart />
              <PurchasingGrowthChart />
              <CustomerRevenueByType />
            </div>

            {/* Charts Row 2 */}
            <div className="grid gap-6 lg:grid-cols-3">
              <CustomersBySource />
              <CustomersByType />
              <CustomerBirthdays />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Index;
