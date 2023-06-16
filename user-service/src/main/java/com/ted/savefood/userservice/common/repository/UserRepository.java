package com.ted.savefood.userservice.common.repository;

import com.ted.savefood.userservice.common.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,String> {

}
