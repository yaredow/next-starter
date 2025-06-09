interface OrganizationWithIdPageProps {
  params: Promise<{ organizationId: string }>;
}

export default async function OrganizationWithIdPage({
  params,
}: OrganizationWithIdPageProps) {
  const { organizationId } = await params;

  return <div>{organizationId}</div>;
}
