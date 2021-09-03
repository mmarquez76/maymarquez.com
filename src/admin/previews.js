const {
  w3DateFilter,
  markdownFilter,
  dateFilter,
  helpers,
} = previewUtil;

const env = nunjucks.configure();

env.addFilter('w3DateFilter', w3DateFilter);
env.addFilter('markdownFilter', markdownFilter);
env.addFilter('dateFilter', dateFilter);

const Preview = ({ entry, path, context }) => {
  const data = context(entry.get('data').toJS());
  const html = env.render(path, { ...data, helpers });
  return <div dangerouslySetInnerHTML={{ __html: html }}/>
};

const Home = ({ entry }) => (
  <Preview
    entry={entry}
    path="layouts/home.njk"
    context={({ title, body, projectsHeading, projectsButtonText }) => ({
      title,
      content: markdownFilter(body),
      projectsHeading,
      projectsButtonText,
      collections: {
        projectFeed: [{
          url: 'javascript:void(0)',
          date: new Date(),
          data: {
            title: 'Sample Project',
          },
        }],
      },
    })}
  />
);

const Project = ({ entry }) => (
  <Preview
    entry={entry}
    path="layouts/project.njk"
    context={({ title, date, body }) => ({
      title,
      date,
      content: markdownFilter(body || ''),
    })}
  />
);

const Page = ({ entry }) => (
  <Preview
    entry={entry}
    path="layouts/page.njk"
    context={({ title, body }) => ({
      title,
      content: markdownFilter(body || ''),
    })}
  />
);

const SiteData = ({ entry }) => (
  <Preview
    entry={entry}
    path="layouts/base.njk"
    context={({ name, shortDesc, showThemeCredit }) => ({
      site: {
        name,
        shortDesc,
        showThemeCredit,
      },
    })}
  />
);

const Nav = ({ entry }) => (
  <Preview
    entry={entry}
    path="layouts/base.njk"
    context={({ items }) => ({
      navigation: {
        items,
      },
    })}
  />
);

CMS.registerPreviewTemplate('home', Home);
CMS.registerPreviewTemplate('projects', Project);
CMS.registerPreviewTemplate('generic_pages', Page);
CMS.registerPreviewTemplate('site_data', SiteData);
CMS.registerPreviewTemplate('nav', Nav);
