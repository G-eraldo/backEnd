import type { Schema, Struct } from '@strapi/strapi';

export interface ContenuSection extends Struct.ComponentSchema {
  collectionName: 'components_contenu_sections';
  info: {
    displayName: 'Section';
  };
  attributes: {
    paragraphe: Schema.Attribute.Blocks;
    titre_section: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contenu.section': ContenuSection;
    }
  }
}
