package com.gift4u.app.domain.user.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gift4u.app.domain.Product.repository.ProductRepository;
import com.gift4u.app.domain.order.repository.OrderRepository;
import com.gift4u.app.domain.user.dto.AdminDashboardResponse;
import com.gift4u.app.domain.user.dto.AdminDashboardResponse.DailyStat;
import com.gift4u.app.domain.user.dto.AdminDashboardResponse.MonthlyStat;
import com.gift4u.app.domain.user.dto.AdminDashboardResponse.RecentUser;
import com.gift4u.app.domain.user.entity.User;
import com.gift4u.app.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    private static final String[] DAYS_KO = {"월", "화", "수", "목", "금", "토", "일"};
    private static final String[] MONTHS_KO = {"1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"};

    @Transactional(readOnly = true)
    public AdminDashboardResponse getDashboard() {
        LocalDate today = LocalDate.now();
        LocalDateTime todayStart = today.atStartOfDay();
        LocalDateTime todayEnd = todayStart.plusDays(1);

        // 기본 통계
        long totalUsers    = userRepository.count();
        long totalProducts = productRepository.count();
        long totalOrders   = orderRepository.count();
        long todaySignups  = userRepository.countByCreatedAtBetween(todayStart, todayEnd);

        // 이번 주 일별 가입자 (월~일)
        LocalDate monday = today.with(DayOfWeek.MONDAY);
        List<DailyStat> weeklySignups = java.util.stream.IntStream.range(0, 7)
                .mapToObj(i -> {
                    LocalDate d = monday.plusDays(i);
                    long cnt = userRepository.countByCreatedAtBetween(d.atStartOfDay(), d.plusDays(1).atStartOfDay());
                    return DailyStat.builder().day(DAYS_KO[i]).count(cnt).build();
                })
                .collect(Collectors.toList());

        // 최근 6개월 주문 수
        List<MonthlyStat> monthlyOrders = java.util.stream.IntStream.rangeClosed(0, 5)
                .mapToObj(i -> {
                    LocalDate first = today.minusMonths(5 - i).withDayOfMonth(1);
                    LocalDate last  = first.plusMonths(1);
                    long cnt = orderRepository.countByCreatedAtBetween(first.atStartOfDay(), last.atStartOfDay());
                    return MonthlyStat.builder()
                            .month(MONTHS_KO[first.getMonthValue() - 1])
                            .value(cnt)
                            .build();
                })
                .collect(java.util.stream.Collectors.toList());

        // 최근 가입 회원 5명
        List<User> recent = userRepository.findAll(
                PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "createdAt"))
        ).getContent();

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("MM.dd HH:mm");
        List<RecentUser> recentUsers = recent.stream()
                .map(u -> RecentUser.builder()
                        .id(u.getId())
                        .nickname(u.getNickname())
                        .email(u.getEmail())
                        .loginProvider(u.getLoginProvider().name())
                        .joinedAt(u.getCreatedAt() != null ? u.getCreatedAt().format(fmt) : "—")
                        .build())
                .collect(Collectors.toList());

        return AdminDashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalProducts(totalProducts)
                .totalOrders(totalOrders)
                .todaySignups(todaySignups)
                .weeklySignups(weeklySignups)
                .monthlyOrders(monthlyOrders)
                .recentUsers(recentUsers)
                .build();
    }
}
