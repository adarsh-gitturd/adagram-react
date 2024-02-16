
export const colorThemes = [
    ['#FAF2F2', '#F3E1E1', '#F1D1D1', '#7D5A5A'],
    ['#DDDDDD', '#C4B6B6', '#7E7474', '#2C061F'],
    ['#E9B5D2', '#9153F4', '#5727A3', '#35013F'],
    ['#D2EBE9', '#ED8240', '#90303D', '#230444'],
    ['#3F1D38', '#4D3C77', '#A2678A', '#EFE1D1'],
    ['#191A19', '#1E5128', '#4E9F3D', '#D8E9A8'],
    ['#151515', '#301B3F', '#3C415C', '#B4A5A5'],
    ['#F2F7A1', '#46C2CB', '#6D67E4', '#453C67'],
    ['#F8FAE5', '#B19470', '#43766C', '#76453B'],
    ['#EADEDE', '#F58840', '#B85252', '#000000'],
    ['#BED754', '#E3651D', '#750E21', '#191919'],
    ['#F5F5F5', '#F05454', '#30475E', '#121212'],
    ['#FDE5D4', '#D6CC99', '#445D48', '#001524'],
    ['#F5E8E4', '#F5C7A9', '#D1512D', '#411530'],
    ['#FFF2F2', '#FAD4D4', '#EF9F9F', '#F47C7C'],
    ['#F0F3FF', '#15F5BA', '#836FFF', '#211951'],
    ['#E8D8C4', '#C7B7A3', '#A94438', '#561C24'],
    ['#FFE6C7', '#FFA559', '#FF6000', '#454545'],
    ['#F5EBEB', '#E4D0D0', '#D5B4B4', '#867070'],
    ['#FF0000', '#950101', '#3D0000', '#000000'],
    ['#D7FBE8', '#9DF3C4', '#62D2A2', '#1FAB89'],
    ['#F3F1F5', '#F0D9FF', '#BFA2DB', '#3B0C3B'],
    ['#F1F6F9', '#9BA4B5', '#394867', '#212A3E'],
    ['#EBF400', '#F57D1F', '#F72798', '#000000'],
    ['#9290C3', '#535C91', '#1B1A55', '#070F2B'],
    ['#EEEDEB', '#E0CCBE', '#747264', '#3C3633']
  ]

export const setTheme = (setSelectedTheme, index) => { 
    if(setSelectedTheme){
        setSelectedTheme(index);
    }
    const theme = colorThemes[index];
    if(theme){
        sessionStorage.setItem('THEMEE', theme);
    }
    sessionStorage.setItem('--v1', theme[0]);
    sessionStorage.setItem('--v2', theme[1]);
    sessionStorage.setItem('--v3', theme[2]);
    sessionStorage.setItem('--v4', theme[3]);
    sessionStorage.setItem("THEMEINDEX", index);

    document.documentElement.style.setProperty('--v1', theme[0]);
    document.documentElement.style.setProperty('--v2', theme[1]);
    document.documentElement.style.setProperty('--v3', theme[2]);
    document.documentElement.style.setProperty('--v4', theme[3]);
  }