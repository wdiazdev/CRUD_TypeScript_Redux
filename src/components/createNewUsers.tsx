import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { useUserActions } from "../hooks/useUserActions";

export function CreateNewUser() {
	const { addUser } = useUserActions();

	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setResult(null);
		const form = event.target as HTMLFormElement;

		const formData = new FormData(form);

		const formParams = {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			github: formData.get("github") as string,
		};

		if (!formParams.name || !formParams.email || !formParams.github) {
			return setResult("ko");
		}
		addUser(formParams);
		setResult("ok");
		form.reset();
	};

	useEffect(() => {
		if (result === "ok" || result === "ko") {
			setTimeout(() => {
				setResult(null);
			}, 3000);
		}
	}, [result]);

	return (
		<Card>
			<Title>
				<form
					onSubmit={handleSubmit}
					style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
				>
					<TextInput name="name" placeholder="Add Name"></TextInput>
					<TextInput name="email" placeholder="Add Email"></TextInput>
					<TextInput name="github" placeholder="Add Github"></TextInput>
					<div
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<Button
							type="submit"
							style={{
								marginRight: "10px",
								backgroundColor: "#06b6d4",
								color: "#FFFFFF",
							}}
						>
							Add User
						</Button>
						<div>
							{result === "ko" && (
								<Badge
									style={{
										backgroundColor: "#ef4444",
										color: "#ffffff",
										borderRadius: "5%",
									}}
								>
									<span
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											gap: "0.3rem",
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
											/>
										</svg>
										Invalid fields!
									</span>
								</Badge>
							)}
						</div>
						<div>
							{result === "ok" && (
								<Badge
									style={{
										backgroundColor: "#10b981",
										color: "#ffffff",
										borderRadius: "5%",
									}}
								>
									<span
										style={{
											display: "flex",
											alignItems: "center",
											gap: "0.3rem",
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
											/>
										</svg>
										User Added!
									</span>
								</Badge>
							)}
						</div>
					</div>
				</form>
			</Title>
		</Card>
	);
}
