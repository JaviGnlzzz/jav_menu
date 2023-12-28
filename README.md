# jav_menu

[!NOTE]
Mouse scroll and keys control menu for Fivem.

[!IMPORTANT]
This is and standalone resource which means you can use in any core.

# Getting Started

* Setting up
    * Go to your server files
    * Drop the resource
    * Start it in your server.cfg - ensure jav_menu:

# Making menus

   * Menu example

    ```
        local Menu = exports['jav_menu']

        RegisterCommand('menu_example', function()
        
            local title = 'Example Menu'
        
            local items = {
                {
                    title = 'Item 1',
                    description = 'This is the first item',
                    value = 'item_1',
                    persoliazedData = {
                        example = 'example'
                    }
                },
                {
                    title = 'Item 2',
                    description = 'This is the second item',
                    value = 'item_2'
                },
            }
        
            Menu:CreateNewMenu(title, items, function(data)
                if (data.value == 'item_1') then
                    print(data.persoliazedData.example)
                elseif (data.value == 'item_2') then
                    print('Item 2 selected')
                end
            end)
        
        end)
      ```
      
    

 Implement dialog in a item of the menu

    
        Menu:CreateNewMenu(title, items, function(data)
            if (data.value == 'item_1') then
                print(data.persoliazedData.example)
            elseif (data.value == 'item_2') then
    
                local title = 'Example Dialog'
                local type = 'text' -- (text, string), number
    
                CreateNewDialog(title, type, function(value)
                    print('Dialog value: ' .. value)
                end)
            end
        end)
    
