'use client';

import { useParams } from 'next/navigation';
import { useAdminUser } from '@v8n/api/src/admin/queries';
import { UserForm } from '@/components/admin/UserForm';
import { Loader2 } from 'lucide-react';

export function EditUserClient() {
    const params = useParams<{ id: string }>();
    const id = params?.id ?? '';

    const { data: user, isLoading, isError } = useAdminUser(id);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-[#3B82F6]" />
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-[#FECACA] bg-[#FEF2F2] py-16">
                <p className="text-sm font-medium text-[#991B1B]">User not found</p>
            </div>
        );
    }

    return <UserForm user={user} isEditMode />;
}
