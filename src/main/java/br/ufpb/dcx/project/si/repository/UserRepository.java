package br.ufpb.dcx.project.si.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpb.dcx.project.si.domain.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByEmailAndPassword(String email, String password);

	User findByEmail(String email);
}
