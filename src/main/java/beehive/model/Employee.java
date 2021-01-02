package beehive.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class Employee {
	 
    public Employee() {
 
    }
 
    public Employee(Integer id, String firstName, String lastName, String email) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
    @NotNull
    private Integer id;
    private String firstName;
    private String lastName;
    @Pattern(regexp="^[a-zA-Z0-9]{3}",message="length must be 3")  
    private String email;
 
    //Getters and setters
 
    @Override
    public String toString() {
        return "Employee [id=" + id + ", firstName=" + firstName + ",  lastName=" + lastName + ", email=" + email + "]";
    }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
    
}