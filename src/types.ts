/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ThemeMode = 'light' | 'dark';

export interface NavItem {
  label: string;
  path: string;
  iconName?: string;
}

export interface ArchitectureModule {
  id: string;
  title: string;
  description: string;
  status: 'Ready' | 'Planned (Part 2)' | 'Planned (Part 3)';
  icon: string;
}
