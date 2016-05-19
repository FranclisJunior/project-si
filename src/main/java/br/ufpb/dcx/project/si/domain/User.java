package br.ufpb.dcx.project.si.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@NotNull
	@NotBlank
	private String name;
	
	@NotNull
	@NotBlank
	private String password;

	@NotNull
	@NotBlank
	@Column(unique = true)
	private String email;
	
	@Column(unique = true)
	private String matriculation;
	
	@NotNull
	@NotBlank
	private String role;
	
	@Temporal(TemporalType.DATE)
	private Date dateBirth;
	
	private String address;
	
	private String city;
	
	private String uf;
	
	private String socialSite;
	
	private String socialFacebook;
	
	private String socialBio;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMatriculation() {
		return matriculation;
	}

	public void setMatriculation(String matriculation) {
		this.matriculation = matriculation;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Date getDateBirth() {
		return dateBirth;
	}

	public void setDateBirth(Date dateBirth) {
		this.dateBirth = dateBirth;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public String getSocialSite() {
		return socialSite;
	}

	public void setSocialSite(String socialSite) {
		this.socialSite = socialSite;
	}

	public String getSocialFacebook() {
		return socialFacebook;
	}

	public void setSocialFacebook(String socialFacebook) {
		this.socialFacebook = socialFacebook;
	}

	public String getSocialBio() {
		return socialBio;
	}

	public void setSocialBio(String socialBio) {
		this.socialBio = socialBio;
	}
	
}
