export const generateDropdownList = (data: any[]) => {
    let options: any[] = [];
    if (data) {
      data.forEach((item) => {
        let itemData = {
          ...item,
          value: item.id,
          label: item.name,
        };
        options.push(itemData);
      });

      // Sort options alphabetically by label
      options.sort((a, b) => a.label.localeCompare(b.label)); 
    }
    return options;
  };
  

export const productModesDropdown = [
    {
        label: 'Yearly',
        value: 'yearly',
    },
    {
        label: 'Half-Yearly',
        value: 'half_yearly',
    },
    {
        label: 'Quarterly',
        value: 'quarterly',
    },
    {
        label: 'Single',
        value: 'single',
    },
    {
        label: 'Monthly',
        value: 'monthly',
    }
];

export const riderClassDropdown = [
    {
        label: 'Class-01',
        value: 'class1',
    },
    {
        label: 'Class-02',
        value: 'class2',
    },
    {
        label: 'Class-03',
        value: 'class3',
    },
]