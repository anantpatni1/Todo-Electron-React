const electron = require('electron');

const {app, BrowserWindow, Menu,ipcMain }=electron;

let mainWindow;
let addWindow;

app.on('ready',()=>{

  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed',()=>app.quit());
  const mainMenu=Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

});

function createAddWindow(){
  addWindow=new BrowserWindow({
    width:300,
    height:200,
    title:'Add New Todo'
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
  addWindow.on('closed',()=>addWindow=null);
}


ipcMain.on('todoadd',(event,todo)=>{
  mainWindow.webContents.send('todoadd', todo);
  addWindow.close();

});


const menuTemplate=[
  {
    label:'File',
    submenu:[
      {
        label:'New Todo',
        click(){
          createAddWindow();
        }
      },
      {
        label:'Quit',
        accelerator:'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

if(process.env.NODE_ENV!=='production'){

  menuTemplate.push({
    label:'View',
    submenu:[
      {

        role:'reload'
      },
      {
        label:'Clear Todos',
        click(){
          mainWindow.webContents.send('todoclear');
        }
      },
      {
        label:'Toggle Developer Tools',
        accelerator:'Ctrl+Shift+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
//production
//dev
//staging
//test
