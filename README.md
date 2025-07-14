Operation POD Selection Plugin:
------------------------------

To begin, you need to clone two separate projects:
1. operationPodSelectionExtensionProvider
2. worklistExtensionProvider

**1. Clone the Repository**
    - Clone the repository into the following path inside your plugin project: (yourPlugin/webapp/operationPodSelectionExtensionProvider)
    - Open and Identify data-name in your plugin’s index.html file.
    - Identify the value of the data-name attribute (e.g., rits.custom.plugin.operationpodselection). This will be used in the upcoming search-and-replace operations
	
**2. Search and Replace in the Cloned Folder**
    - Right-click on the cloned folder operationPodSelectionExtensionProvider.
    - Select "Find in Folder".
    - Perform the following search-and-replace operations:
        i. Replace 1:
            - Use this in the Search field: rits.custom.plugin.operationpodselection
            - Use this in the replace field: with your namespace from the index.html file
            - Click "Replace All Icon".
        ii. Replace 2:
            - Use this in the Search field: rits/custom/plugin/operationpodselection
            - Convert your data-name (e.g., rits.custom.plugin.operationpodselection) to a folder path by replacing dots . with slashes / (e.g., rits/custom/plugin/operationpodselection).
            - Use this in the replace field: with your namespace from the index.html file 
            - Click "Replace All Icon".
			
**3. Update component.json**
    - Open the file: yourPlugin/webapp/designer/component.json
    - Inside the extensions list, add an entry for the plugin with the following structure:
	   after the components:
	   rits/custom/plugin/operationpodselection:
	   
          "extensions": [
        {
            "provider": "rits/custom/plugin/operationpodselection/operationpodselection/operationPodSelectionExtensionProvider/ExtensionProvider",
            "controller": "sap.dm.dme.sap.dm.dme.plugins.operationPodSelectionPlugin",
            "inclusions": [
                {
                    "pods": [
                         "pod1", "pod2"
                    ],
                    "plants": [
                        "plant1", "plant2"
                    ]
                }
            ]
        }
    ]
    **Important Note: After pasting the above JSON:
          i. Ensure provider matches the correct plugin path. It should be: <data-name with slashes>/operationPodSelectionExtensionProvider/ExtensionProvider. For example, if your data-name is rits.custom.plugin.operationpodselection, then it becomes: rits/custom/plugin/operationpodselection/operationpodselection/operationPodSelectionExtensionProvider/ExtensionProvider.
          ii. Ensure pods and plants are updated based on your actual deployment targets. Replace "pod1", "pod2" and "plant1", "plant2" with real values.**
		  
**4. Build and Deploy Your Plugin**
      - Build your plugin project using your standard build process.
      - Deploy it to your target environment.
	  
**5. Verify the Result**
      - Navigate to the relevant section in your app.
      - Verify that the extension is functioning correctly and is visible for the specified pods and plants defined in the component.json file.
	  	  
Note: Repeat the same steps for the worklistExtensionProvider project as well.  
Also, clone the util project from the following GitHub repository: https://github.com/SAP-samples/digital-manufacturing-extension-samples.git
Navigate to: dmc-coreplugin-extension > plugins > webapp > utils
and repeat the same setup process for this utils project as well
