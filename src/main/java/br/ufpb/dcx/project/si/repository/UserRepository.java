package br.ufpb.dcx.project.si.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpb.dcx.project.si.domain.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUsername(String username);
	
	User findByUsernameAndPassword(String username, String password);
}
