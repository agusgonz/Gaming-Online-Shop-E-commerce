"use client"
import React from "react"
import { useSession } from "next-auth/react"
import Loading from "@/components/Loading"
import UnauthenticatedFrame from "@/components/UnauthenticatedFrame"
import AvatarIcon from "@/components/AvatarIcon"
import Link from "next/link"
import OnActiveUnderline from "@/components/OnActiveUnderline"

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { data: session, status } = useSession()

	console.log(session)

	if (status == "authenticated") {
		return (
			<div className="flex flex-col gap-12 md:grid md:grid-cols-3 md:gap-2 my-2">
				<div className="w-40  mx-auto flex flex-col gap-12">
					<div className=" gap-8 flex flex-col justify-center items-center">
						<figure>
							<AvatarIcon
								image={session.user.image}
								isBig
							/>
						</figure>
						<div className="flex flex-col gap-1 py-1 justify-center items-center border-y-2 border-_blue">
							<h1 className="text-lg font-normal">
								{session.user.name}
							</h1>
							<p className="text-sm  text-_green">
								{session.user.email}
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<OnActiveUnderline
							name={"Orders"}
							url={"/profile/orders"}
						/>
						<OnActiveUnderline
							name={"Products"}
							url={"/profile/products"}
						/>
						<OnActiveUnderline
							name={"Sellings"}
							url={"/profile/sellings"}
						/>
					</div>
				</div>

				<div className="col-span-2">{children}</div>
			</div>
		)
	}

	if (status == "loading") {
		return <Loading />
	}

	if (status == "unauthenticated") {
		return <UnauthenticatedFrame />
	}
}
