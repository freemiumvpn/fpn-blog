module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['introduction'],
    },
    {
        type: 'category',
        label: 'Developer',
        items: [
            {
                type: 'category',
                label: 'How To',
                items: [
                    'developer/how-to/web/2021-01-10-runtime-env-vars',
                    'developer/how-to/web/2021-01-21-runtime-env-vars-v2',
                    "developer/how-to/infra/2021-02-16-tcp-load-balancer-with-nginx"
                ],
            },
            {
                type: 'category',
                label: 'Tutorial',
                items: [
                    'developer/tutorials/infra/2021-02-10-k8s-cluster-setup-gcp-kops'
                ],
            },
        ],
    },
    {
        type: 'category',
        label: 'User',
        items: [
            {
                type: 'category',
                label: 'How To',
                items: [
                    'user/how-to/2021-02-22-install-fpn',
                ],
            },
        ],
    },
    {
        type: 'category',
        label: 'How To guides',
        items: [],
    },
    {
        type: 'category',
        label: 'Reference',
        items: [],
    },
    {
        type: 'category',
        label: 'Explanation',
        items: [],
    }
  ],
};
