"use client";

import React from 'react';
import { RoleCard, RoleCardProps } from './role-card';

export interface RoleSelectionProps {
  roles: RoleCardProps[];
  onRoleSelect?: (id: string) => void;
}

export function RoleSelection({ roles, onRoleSelect }: RoleSelectionProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Select your role</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {roles.map((role) => (
          <RoleCard 
            key={role.id}
            {...role}
            onClick={onRoleSelect}
          />
        ))}
      </div>
    </section>
  );
}