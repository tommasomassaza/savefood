package com.ted.savefood.userservice.common.repository;

import com.ted.savefood.userservice.common.model.VerificationToken;
import org.springframework.data.repository.CrudRepository;

public interface VerificationTokenRepository extends CrudRepository<VerificationToken,String> {
}
