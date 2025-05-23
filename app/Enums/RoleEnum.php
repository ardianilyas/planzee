<?php

namespace App\Enums;

enum RoleEnum: string
{
    case None = 'None';
    case Admin = 'Admin';
    case BackendDeveloper = 'Backend Developer';
    case FrontendDeveloper = 'Frontend Developer';
    case UIDesigner = 'UI Designer';
    case DatabaseAdministrator = 'Database Administrator';
    case ProjectManager = 'Project Manager';
    case QAEngineer = 'QA Engineer';
    case ScrumMaster = 'Scrum Master';
}
