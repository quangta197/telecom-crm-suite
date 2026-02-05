import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OpportunityPipeline } from "@/components/dashboard/OpportunityPipeline";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { TopDeals } from "@/components/dashboard/TopDeals";
import {
  Users,
  Target,
  TrendingUp,
  DollarSign,
} from "lucide-react";

const Index = () => {
  return (
    <MainLayout showFilters={false} showActivity={false}>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your activity overview.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2">
            <span className="text-sm text-muted-foreground">January 2024</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Contacts"
            value="1,284"
            change={12.5}
            changeLabel="vs last month"
            icon={<Users className="h-6 w-6 text-primary" />}
          />
          <StatCard
            title="New Leads"
            value="48"
            change={8.2}
            changeLabel="vs last month"
            icon={<Target className="h-6 w-6 text-primary-foreground" />}
            variant="primary"
          />
          <StatCard
            title="Active Opportunities"
            value="67"
            change={-3.1}
            changeLabel="vs last month"
            icon={<TrendingUp className="h-6 w-6 text-success-foreground" />}
            variant="success"
          />
          <StatCard
            title="Monthly Revenue"
            value="$850K"
            change={24.3}
            changeLabel="vs last month"
            icon={<DollarSign className="h-6 w-6 text-warning-foreground" />}
            variant="warning"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueChart />
          <OpportunityPipeline />
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentActivities />
          <TopDeals />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
