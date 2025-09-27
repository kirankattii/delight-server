import type { Schema, Struct } from '@strapi/strapi';

export interface BlockBellevueeStyle extends Struct.ComponentSchema {
  collectionName: 'components_block_bellevuee_styles';
  info: {
    displayName: 'bellevueeStyle';
  };
  attributes: {
    activities: Schema.Attribute.Component<
      'shared.facilities-and-activities',
      true
    >;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlockCanvasBelowYoutube extends Struct.ComponentSchema {
  collectionName: 'components_block_canvas_below_youtubes';
  info: {
    displayName: 'canvasBelowYoutube';
  };
  attributes: {
    description: Schema.Attribute.Text;
    projectHighlights: Schema.Attribute.Component<
      'block.project-highlights',
      false
    >;
    title: Schema.Attribute.String;
    visitSteps: Schema.Attribute.Component<'shared.steps', true>;
    visitUs: Schema.Attribute.String;
  };
}

export interface BlockContentBelowYoutube extends Struct.ComponentSchema {
  collectionName: 'components_block_content_below_youtubes';
  info: {
    displayName: 'contentBelowYoutube';
  };
  attributes: {
    activities: Schema.Attribute.Component<
      'shared.facilities-and-activities',
      true
    >;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlockImageSlider extends Struct.ComponentSchema {
  collectionName: 'components_block_image_sliders';
  info: {
    displayName: 'Image Slider';
  };
  attributes: {
    imagesSlides: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface BlockMasterPlan extends Struct.ComponentSchema {
  collectionName: 'components_block_master_plans';
  info: {
    displayName: 'Master plan';
  };
  attributes: {
    description: Schema.Attribute.Text;
    fileUpload: Schema.Attribute.Media<'files'>;
    planeMap: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface BlockProjectHighlights extends Struct.ComponentSchema {
  collectionName: 'components_block_project_highlights';
  info: {
    displayName: 'Project Highlights';
  };
  attributes: {
    activities: Schema.Attribute.Component<
      'shared.facilities-and-activities',
      true
    >;
    projectHighlights: Schema.Attribute.String;
  };
}

export interface BlockProjectSteps extends Struct.ComponentSchema {
  collectionName: 'components_block_project_steps';
  info: {
    displayName: 'project-steps';
  };
  attributes: {
    activities: Schema.Attribute.Component<
      'shared.facilities-and-activities',
      true
    >;
    projectSteps: Schema.Attribute.Component<'shared.steps', true>;
    title1: Schema.Attribute.String;
    title2: Schema.Attribute.String;
  };
}

export interface BlockRichContentBlocks extends Struct.ComponentSchema {
  collectionName: 'components_block_rich_content_blocks';
  info: {
    displayName: 'Rich Content Blocks';
  };
  attributes: {
    ImageBlock: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    TextBlock: Schema.Attribute.Blocks;
  };
}

export interface BlockSeo extends Struct.ComponentSchema {
  collectionName: 'components_block_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    metaTitle: Schema.Attribute.String;
  };
}

export interface BlockYouTubeVideo extends Struct.ComponentSchema {
  collectionName: 'components_block_you_tube_videos';
  info: {
    displayName: 'YouTube Video';
  };
  attributes: {
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
    youtubeLink: Schema.Attribute.String;
  };
}

export interface SharedFacilitiesAndActivities extends Struct.ComponentSchema {
  collectionName: 'components_shared_facilities_and_activities';
  info: {
    displayName: 'Facilities and Activities';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedSteps extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps';
  info: {
    displayName: 'steps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'block.bellevuee-style': BlockBellevueeStyle;
      'block.canvas-below-youtube': BlockCanvasBelowYoutube;
      'block.content-below-youtube': BlockContentBelowYoutube;
      'block.image-slider': BlockImageSlider;
      'block.master-plan': BlockMasterPlan;
      'block.project-highlights': BlockProjectHighlights;
      'block.project-steps': BlockProjectSteps;
      'block.rich-content-blocks': BlockRichContentBlocks;
      'block.seo': BlockSeo;
      'block.you-tube-video': BlockYouTubeVideo;
      'shared.facilities-and-activities': SharedFacilitiesAndActivities;
      'shared.steps': SharedSteps;
    }
  }
}
