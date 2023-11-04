export default class Task {
	public Id?: number | null;
	public Name?: string | null;
	public Description?: string | null;
	public Status?: number | null; // -1 - Failed | 0 - In progress | 1 - Done
	public ExpiryDate?: Date | null;
	public isNotificated?: boolean | null;
	public ProfileId?: number | null;
	public FolderId?: number | null;
}
