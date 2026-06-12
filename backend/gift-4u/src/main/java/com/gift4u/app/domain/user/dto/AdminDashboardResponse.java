package com.gift4u.app.domain.user.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdminDashboardResponse {

    private long totalUsers;
    private long totalProducts;
    private long totalOrders;
    private long todaySignups;

    private List<DailyStat> weeklySignups;
    private List<MonthlyStat> monthlyOrders;
    private List<RecentUser> recentUsers;

    @Getter
    @Builder
    public static class DailyStat {
        private String day;
        private long count;
    }

    @Getter
    @Builder
    public static class MonthlyStat {
        private String month;
        private long value;
    }

    @Getter
    @Builder
    public static class RecentUser {
        private Long id;
        private String nickname;
        private String email;
        private String loginProvider;
        private String joinedAt;
    }
}
