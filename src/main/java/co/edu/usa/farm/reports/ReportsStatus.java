package co.edu.usa.farm.reports;

public class ReportsStatus {
	 private int completed;
	 private int cancelled;
	 /**
	  * Constructor
	  * @param completed
	  * @param cancelled
	  */
	public ReportsStatus(int completed, int cancelled) {
		super();
		this.completed = completed;
		this.cancelled = cancelled;
	}
	/**
	 * Getters and Setters
	 * @return
	 */
	public int getCompleted() {
		return completed;
	}
	public void setCompleted(int completed) {
		this.completed = completed;
	}
	public int getCancelled() {
		return cancelled;
	}
	public void setCancelled(int cancelled) {
		this.cancelled = cancelled;
	}
	 
}
