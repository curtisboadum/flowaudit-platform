import type { LeadStatus } from "@/lib/crm-store";

export type CrmLocale = "en" | "es";

export interface CrmLocaleCopy {
  common: {
    loading: string;
    save: string;
    cancel: string;
    add: string;
    edit: string;
    delete: string;
  };
  login: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    submit: string;
    errorInvalid: string;
  };
  sidebar: {
    leads: string;
    pipeline: string;
    webLeads: string;
    settings: string;
    apiKeys: string;
    comingSoon: string;
    language: string;
    logout: string;
  };
  dashboard: {
    title: string;
    subtitleAdmin: string;
    subtitleEsteban: string;
  };
  table: {
    addLead: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    status: string;
    source: string;
    dateAdded: string;
    actions: string;
    emptyTitle: string;
    emptySubtitle: string;
    editLead: string;
    deleteLead: string;
    deleteConfirm: string;
  };
  drawer: {
    addTitle: string;
    editTitle: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    status: string;
    source: string;
    notes: string;
    language: string;
    assignedTo: string;
    assignedAdmin: string;
    assignedEsteban: string;
    langEnglish: string;
    langSpanish: string;
    notesPlaceholder: string;
  };
  status: Record<LeadStatus, string>;
}

export interface CrmTranslations {
  en: CrmLocaleCopy;
  es: CrmLocaleCopy;
}

export const crmTranslations: CrmTranslations = {
  en: {
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      add: "Add",
      edit: "Edit",
      delete: "Delete",
    },
    login: {
      title: "Internal CRM",
      subtitle: "Sign in to manage leads and pipeline activity.",
      email: "Email",
      password: "Password",
      submit: "Sign In",
      errorInvalid: "Invalid email or password.",
    },
    sidebar: {
      leads: "Leads",
      pipeline: "Pipeline",
      webLeads: "Web Leads",
      settings: "Settings",
      apiKeys: "API Keys",
      comingSoon: "Coming soon",
      language: "Language",
      logout: "Log out",
    },
    dashboard: {
      title: "Lead Management",
      subtitleAdmin: "Filter by language, assign owners, and keep momentum.",
      subtitleEsteban: "Gestiona prospectos en espanol y avanza cada oportunidad.",
    },
    table: {
      addLead: "Add Lead",
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      status: "Status",
      source: "Source",
      dateAdded: "Date Added",
      actions: "Actions",
      emptyTitle: "No leads yet",
      emptySubtitle: "Create your first lead to start building pipeline.",
      editLead: "Edit lead",
      deleteLead: "Delete lead",
      deleteConfirm: "Delete this lead? This action cannot be undone.",
    },
    drawer: {
      addTitle: "Add Lead",
      editTitle: "Edit Lead",
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      status: "Status",
      source: "Source",
      notes: "Notes",
      language: "Language",
      assignedTo: "Assigned to",
      assignedAdmin: "Admin",
      assignedEsteban: "Esteban",
      langEnglish: "English",
      langSpanish: "Spanish",
      notesPlaceholder: "Add context, requirements, and next step notes.",
    },
    status: {
      new: "New",
      contacted: "Contacted",
      qualified: "Qualified",
      proposal: "Proposal",
      won: "Won",
      lost: "Lost",
    },
  },
  es: {
    common: {
      loading: "Cargando...",
      save: "Guardar",
      cancel: "Cancelar",
      add: "Agregar",
      edit: "Editar",
      delete: "Eliminar",
    },
    login: {
      title: "CRM Interno",
      subtitle: "Inicia sesion para gestionar prospectos y actividad comercial.",
      email: "Correo",
      password: "Contrasena",
      submit: "Ingresar",
      errorInvalid: "Correo o contrasena invalidos.",
    },
    sidebar: {
      leads: "Prospectos",
      pipeline: "Pipeline",
      webLeads: "Leads Web",
      settings: "Configuracion",
      apiKeys: "Claves API",
      comingSoon: "Proximamente",
      language: "Idioma",
      logout: "Cerrar sesion",
    },
    dashboard: {
      title: "Gestion de Prospectos",
      subtitleAdmin: "Filtra por idioma, asigna responsables y mantiene el avance.",
      subtitleEsteban: "Gestiona prospectos en espanol y avanza cada oportunidad.",
    },
    table: {
      addLead: "Agregar Prospecto",
      name: "Nombre",
      company: "Empresa",
      email: "Correo",
      phone: "Telefono",
      status: "Estado",
      source: "Fuente",
      dateAdded: "Fecha",
      actions: "Acciones",
      emptyTitle: "No hay prospectos",
      emptySubtitle: "Crea el primer prospecto para iniciar el pipeline.",
      editLead: "Editar prospecto",
      deleteLead: "Eliminar prospecto",
      deleteConfirm: "Eliminar este prospecto? Esta accion no se puede deshacer.",
    },
    drawer: {
      addTitle: "Agregar Prospecto",
      editTitle: "Editar Prospecto",
      name: "Nombre",
      company: "Empresa",
      email: "Correo",
      phone: "Telefono",
      status: "Estado",
      source: "Fuente",
      notes: "Notas",
      language: "Idioma",
      assignedTo: "Asignado a",
      assignedAdmin: "Admin",
      assignedEsteban: "Esteban",
      langEnglish: "Ingles",
      langSpanish: "Espanol",
      notesPlaceholder: "Agrega contexto, requisitos y proximos pasos.",
    },
    status: {
      new: "Nuevo",
      contacted: "Contactado",
      qualified: "Calificado",
      proposal: "Propuesta",
      won: "Ganado",
      lost: "Perdido",
    },
  },
};

export function getCrmTranslations(locale: CrmLocale): CrmLocaleCopy {
  return crmTranslations[locale];
}
