package com.dcg.digi_cap_group.Repository;

import com.dcg.digi_cap_group.Domain.Entities.Role;
import com.dcg.digi_cap_group.Domain.Entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmailIgnoreCaseAndDeletedFalse(String email);
    Optional<Users> findByEmailIgnoreCaseAndDeletedTrue(String email);
    Optional<Users> findByFirstName(String firstName);
    Users findByRole(Role role);
    @Query("SELECT u FROM Users u WHERE u.deleted = false")
	List<Users> findAllActiveUsers();

    @Query("SELECT u FROM Users u WHERE u.deleted = true")
    List<Users> findAllByDeletedTrue();
	List<Users> findAllByLastLoggedInBefore(LocalDateTime threshold);
	
	@Query("SELECT u FROM Users u WHERE " +
       "(u.lastLoggedIn IS NOT NULL AND u.lastLoggedIn < :threshold) OR " +
       "(u.lastLoggedIn IS NULL AND u.createdAt < :threshold)")
	List<Users> findUsersInactiveSince(@Param("threshold") LocalDateTime threshold);

    @Query("SELECT u FROM Users u WHERE u.deleted = false AND " +
       "((u.lastLoggedIn IS NOT NULL AND u.lastLoggedIn BETWEEN :start AND :end) OR " +
       "(u.lastLoggedIn IS NULL AND u.createdAt BETWEEN :start AND :end))")
    List<Users> findUsersToWarnBeforeDeletion(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);


    Boolean existsByEmailIgnoreCase(String email);
    void deleteByEmailIgnoreCase(String email);
}
