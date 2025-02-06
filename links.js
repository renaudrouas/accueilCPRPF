// Fonction pour créer un élément de lien
function createLinkElement(key, linkData) {
    const link = document.createElement('a');
    link.href = linkData.url || '#';
    link.className = `link-item ${linkData.type || 'other'}`;

    // Détection du navigateur
    const isEdge = navigator.userAgent.indexOf("Edg") !== -1;
    const isChrome = navigator.userAgent.indexOf("Chrome") !== -1 && !isEdge;

    // Ajout de l'événement click
    link.addEventListener('click', function (e) {
        e.preventDefault();

        if (isChrome) {
            console.log("🟢 Chrome détecté : Scénario 1");
            scenarioChrome(linkData);
        } else if (isEdge) {
            console.log("🔵 Edge détecté : Scénario 2");
            scenarioEdge(linkData);
        } else {
            alert("⚠️ Veuillez utiliser Chrome ou Edge pour une meilleure compatibilité.");
            window.open(this.href, '_blank');
        }
    });

    // Création de l'icône
    const iconContainer = document.createElement('span');
    iconContainer.className = 'icon-container';
    const icon = document.createElement('i');
    icon.className = linkData.icon;
    iconContainer.appendChild(icon);

    // Création du texte
    const text = document.createElement('span');
    text.textContent = linkData.text;
    text.className = 'link-text';

    // Assemblage des éléments
    link.appendChild(iconContainer);
    link.appendChild(text);

    return link;
}

// 🟢 Scénario 1 : Chrome
function scenarioChrome(linkData) {
    if (linkData.type === 'cpr') {
        console.log("🔄 Redirection Edge pour un lien CPR");
        openInEdge(linkData.url);
    } else {
        window.open(linkData.url, '_blank');
    }
}

// 🔵 Scénario 2 : Edge
function scenarioEdge(linkData) {
    if (linkData.type === 'inetum') {
        console.log("🔄 Redirection Chrome pour un lien Inetum");
        openInChrome(linkData.url);
    } else {
        window.open(linkData.url, '_blank');
    }
}

// Fonction pour ouvrir un lien sur Edge
function openInEdge(url) {
    const edgeUrl = `microsoft-edge:${url}`;
    window.location.href = edgeUrl;
}

// Fonction pour ouvrir un lien sur Chrome
function openInChrome(url) {
    const chromeUrl = `googlechrome:${url}`;
    window.location.href = chromeUrl;
}

    // Création de l'icône avec un conteneur
    const iconContainer = document.createElement('span');
    iconContainer.className = 'icon-container';
    const icon = document.createElement('i');
    icon.className = linkData.icon;
    iconContainer.appendChild(icon);
    
    // Création du texte
    const text = document.createElement('span');
    text.textContent = linkData.text;
    text.className = 'link-text';
    
    // Assemblage des éléments
    link.appendChild(iconContainer);
    link.appendChild(text);
    
    return link;


// Fonction pour rendre les liens dans un conteneur
function renderLinks(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !links[category]) return;

    // Trier les liens par ordre alphabétique du texte
    const sortedLinks = Object.entries(links[category]).sort((a, b) => 
        a[1].text.localeCompare(b[1].text, 'fr', {ignorePunctuation: true})
    );

    // Créer et ajouter chaque lien
    sortedLinks.forEach(([key, linkData]) => {
        const linkElement = createLinkElement(key, linkData);
        container.appendChild(linkElement);
    });
}

// Définition des liens par catégorie
const links = {
    equipe: {
        sharepoint: {
            url: "https://gfi1.sharepoint.com/sites/TMEOps/?xsdata=MDV8MDF8fDJiZWNhZjg4ZjA1YTRkZDc5ZWNiMDhkYjc1NmY5ZjM0fDc1YTZlNTY2LTIzN2YtNDg4OS05ZWNmLTVhZmJhNGE2YTQ1N3wwfDB8NjM4MjE2MTk5NjU1MjcwMDAwfEdvb2R8VkdWaGJYTmxjbU52Ym1Wc2IzVmtMbmRwYm1Sdmozd3x8fDE%3D&sdata=YUVHdkxOWWlXRHFrVXBkRlBBZk5hUzNxWXdPZXBGWjlzZlYwNVVkQT0%3D&ovuser=75a6e566-237f-4889-9ecf-5afba4a6a457%2Cpierre.rouarch%40inetum.com&OR=Teams-HL&CT=1705479920809&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiIyMzI5MjQwMjQwNiIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D",
            icon: "fa-brands fa-windows",
            text: "Sharepoint Equipe Inetum",
            type: "inetum"
        },
        planning: {
            url: "https://cprpsncf.sharepoint.com/:x:/r/sites/E_SI_EXT_INETUM/_layouts/15/Doc.aspx?sourcedoc=%7BF383FF4E-E836-407C-B0B0-481BC491C584%7D&file=Planning_Absences_TMA-TME.xlsx&action=default&mobileredirect=true",
            icon: "fa-brands fa-microsoft",
            text: "Planning absences équipe",
            type: "cpr"
        },
        squad: {
            url: "https://trello.com/b/5AwfrEf4/squad-inetum",
            icon: "fa-brands fa-trello",
            text: "Squad Inetum",
            type: "other"
        },
        stt: {
            url: "https://gfi1.sharepoint.com/:f:/r/sites/CPRPF-M022-Pilotage/Documents%20partages/CPRPF%20-%20M022%20-%20Pilotage/05-Re%CC%81fe%CC%81rentiel%20Contractuel/10-Fournisseurs?csf=1&web=1&e=lSNpEV",
            icon: "fa-brands fa-microsoft",
            text: "Sous-Traitants",
            type: "inetum"
        }
    },
    referentiel: {
        annuaire: {
            url: "https://gfi1.sharepoint.com/:x:/r/sites/CPRPF-M022-Pilotage/Documents%20partages/CPRPF%20-%20M022%20-%20Pilotage/25-Ressources%20humaines/30-Entre%CC%81es%20sorties/T940%20-%20FR%20V2%20Annuaire%20CPRP%20SNCF.xlsx?d=w568144ae1d38431ea8d5ffd34937c2c1&csf=1&web=1&e=jqZvpz",
            icon: "fa-regular fa-file-excel",
            text: "Annuaire Projet (T940)",
            type: "inetum",
        },
        matriceCompetence: {
            url: "https://gfi1.sharepoint.com/:f:/r/sites/CPRPF-M022-Pilotage/Documents%20partages/CPRPF%20-%20M022%20-%20Pilotage/25-Ressources%20humaines/05-Matrice%20compe%CC%81tences?csf=1&web=1&e=54VFUX",
            icon: "fa-solid fa-book",
            text: "Matrice Compétence (T055)",
            type: "inetum"
        },
        OrdreMissions: {
            url: "https://gfi1-my.sharepoint.com/my?remoteItem=%7B%22mp%22%3A%7B%22webAbsoluteUrl%22%3A%22https%3A%2F%2Fgfi1%2Dmy%2Esharepoint%2Ecom%2Fpersonal%2Frenaud%5Frouas%5Finetum%5Fcom%22%2C%22listFullUrl%22%3A%22https%3A%2F%2Fgfi1%2Dmy%2Esharepoint%2Ecom%2Fpersonal%2Frenaud%5Frouas%5Finetum%5Fcom%2FDocuments%22%2C%22rootFolder%22%3A%22%2Fpersonal%2Frenaud%5Frouas%5Finetum%5Fcom%2FDocuments%2F00%5FI%26O%20%2D%20BU%20Protection%20Sociale%2DCPRPF%20%2D%20Ordres%20de%20Mission%22%7D%2C%22rsf%22%3A%7B%22listId%22%3A%22c076c61e%2Dee4f%2D4e7b%2Da865%2Da0c624e57c7a%22%2C%22siteUrl%22%3A%22https%3A%2F%2Fgfi1%2Esharepoint%2Ecom%2Fsites%2FIO%2DBUProtectionSociale%2DCPRPF%2DOrdresdeMission%22%2C%22uniqueId%22%3A%22%22%7D%7D&View=0",
            icon: "fa-solid fa-book",
            text: "Ordre de missions",
            type: "inetum"
        },
        livretAccueil: {
            url: "https://delivery.inetum.com/confluence/display/ICPRS/Livret+d%27accueil",
            icon: "fa-brands fa-confluence",
            text: "Livret d'accueil",
            type: "inetum"
        },
        xWiki: {
            url: "http://192.168.167.8:8080/xwiki/bin/view/Main/?srid=Cbg1hG89",
            icon: "fa-brands fa-wikipedia-w",
            text: "XWiki",
            type: "cpr"
        }
    },
    pilotage: {
        M022Pilotage: {
            url: "https://gfi1.sharepoint.com/:f:/r/sites/CPRPF-M022-Pilotage/Documents%20partages/CPRPF%20-%20M022%20-%20Pilotage?csf=1&web=1&e=Tk9mHi",
            icon: "fa-brands fa-microsoft",
            text: "M022 - pilotage",
            type: "inetum"
        },
        chronotime: {
            url: "https://ctime.inetum.group/chronotime/index.html#z/coll",
            icon: "fa-solid fa-calendar-days",
            text: "Chronotime",
            type: "inetum"
        },
        orchestra: {
            url: "https://cpr.orchestra-ppm.cloud/cpms/",
            icon: "fa-regular fa-calendar",
            text: "Orchestra",
            type: "cpr"
        },
        suiviFinancier: {
            url: "https://gfi1.sharepoint.com/sites/IO-BUProtectionSociale-CPRPF-FichesProjets/Documents%20partages/Forms/AllItems.aspx?csf=1&web=1&e=WackhF&CID=e1cabd1b%2Daefb%2D49f3%2Dae75%2D92350bcdf3ef&FolderCTID=0x01200045125B8391441E45B99E2C03BEF7901A&viewid=e404960c%2Dc398%2D48a6%2D95cb%2D287fc06a4d47",
            icon: "fa-solid fa-euro-sign",
            text: "Fiches Projets",
            type: "inetum"
        }
    },
    risques: {
        matriceRisques: {
            url: "https://gfi1.sharepoint.com/:x:/r/sites/TMEOps/Documents%20partages/CPRPF/01%20-%20Pilotage/Registre%20Risques%20CPRPF.xlsx?d=w9f9f0c4b5f1c4e2b8f0a8c0f4e5e5f0a&csf=1&web=1&e=1a2b3c",
            icon: "fa-solid fa-triangle-exclamation",
            text: "Matrice Risques (T011)",
            type: "inetum"
        },
        planActions: {
            url: "https://gfi1.sharepoint.com/:x:/r/sites/TMEOps/Documents%20partages/CPRPF/01%20-%20Pilotage/Registre%20Risques%20CPRPF.xlsx?d=w9f9f0c4b5f1c4e2b8f0a8c0f4e5e5f0a&csf=1&web=1&e=1a2b3c",
            icon: "fa-solid fa-triangle-exclamation",
            text: "Plan d'actions (F022)",
            type: "inetum"
        }
    },
    collaboratif: {
        confluence: {
            url: "https://confluence.inetum.world/display/CPRPF",
            icon: "fa-brands fa-confluence",
            text: "Confluence CPRPF",
            type: "inetum"
        },
        tableauBlanc: {
            url: "https://whiteboard.office.com/",
            icon: "fa-solid fa-paintbrush",
            text: "Tableau Blanc",
            type: "inetum"
        },
        jira: {
            url: "https://jira.inetum.world/projects/CPRPF",
            icon: "fa-brands fa-jira",
            text: "Jira CPRPF",
            type: "inetum"
        },
        loopInetum: {
            url: "https://loop.cloud.microsoft/",
            icon: "fa-solid fa-arrow-rotate-left",
            text: "Loop Inetum",
            type: "inetum"
        },
        loopCprpf: {
            url: "https://loop.cloud.microsoft/",
            icon: "fa-solid fa-arrow-rotate-right",
            text: "Loop CPRPF",
            type: "cpr"
        },
        pointSiTo: {
            url: "https://cprpsncf.sharepoint.com/sites/T_SERVICE_INCIDENT_CHANGE/Documents%20partages/Forms/AllItems.aspx?FolderCTID=0x01200047883AEA36091E4C97EC50963DC6283E&id=%2Fsites%2FT%5FSERVICE%5FINCIDENT%5FCHANGE%2FDocuments%20partages%2FGeneral%2FPoints%20SI%2DTO",
            icon: "fa-solid fa-book",
            text: "Point SI-TO",
            type: "cpr"
        }
    },
    outils: {
        calculator: {
            icon: "fa-solid fa-calculator",
            text: "Calculatrice",
            modal: "calculatorModal",
            type: "other"
        },
        gitlab: {
            url: "https://gitlab.cpr.local/users/sign_in",
            icon: "fa-brands fa-gitlab",
            text: "GitLab CPRPF",
            type: "cpr"
        },
        ticketsInetum: {
            url: "https://gfiindusprod.service-now.com/ghd",
            icon: "fa-solid fa-ticket",
            text: "Snow Inetum",
            type: "inetum"
        },
        adminTme: {
            url: "http://devtme.cpr.sncf.fr:8080/admin_tme/cpr.html",
            icon: "fas fa-toolbox",
            text: "Admin TME",
            type: "cpr"
        },
        antares: {
            url: "https://antares.cpr.sncf.fr:8444/coreadmin/common/main.html?page=/coreadmin/transferlog/transferLog.jspx",
            icon: "fa-solid fa-check",
            text: "Antares",
            type: "cpr"
        }
    },
    livraisons: {
        planificationChangements: {
            url: "https://loop.cloud.microsoft/p/eyJ3Ijp7InUiOiJodHRwczovL2NwcnBzbmNmLnNoYXJlcG9pbnQuY29tLz9uYXY9Y3owbE1rWW1aRDFpSVZkTFJXeE5jbkkzV1VVeU5rcFlkRVZ2WlZWVFVIQlhZamd5YkZobmNVWkthelpNWkU1M1ZWOW1UME5XWjBwTE1qSndRalZVTld3MGN6WlRYekJuUjA0bVpqMHdNVVpHUVZCRFJqUklXRUpPVGs5R1FreFZUa0ZKVEZaSFRVMDNWVk5WVGxKSkptTTlKbVpzZFdsa1BURSUzRCIsInIiOmZhbHNlfSwicCI6eyJ1IjoiaHR0cHM6Ly9jcHJwc25jZi5zaGFyZXBvaW50LmNvbS86Zmw6L2cvY29udGVudHN0b3JhZ2UvQ1NQXzMyMjVhMTU4LWZiYmEtNGQ2MC1iYTI1LTdiNDRhMWU1MTIzZS9FWEJuNkZGQy1maEt0bF9SZjdsakx1Z0JDN3hJc0h3dS1RQy1XQmE4VzVjZXVRP25hdj1jejBsTWtaamIyNTBaVzUwYzNSdmNtRm5aU1V5UmtOVFVGOHpNakkxWVRFMU9DMW1ZbUpoTFRSa05qQXRZbUV5TlMwM1lqUTBZVEZsTlRFeU0yVW1aRDFpSVZkTFJXeE5jbkkzV1VVeU5rcFlkRVZ2WlZWVFVIQlhZamd5YkZobmNVWkthelpNWkU1M1ZWOW1UME5XWjBwTE1qSndRalZVTld3MGN6WlRYekJuUjA0bVpqMHdNVVpHUVZCRFJqTlJUVGRWUmtOUldGbzNRa1pNVFZnMlVsQTJORmRIVEZoSkptTTlKVEpHSm1ac2RXbGtQVEVtZUQwbE4wSWxNakozSlRJeUpUTkJKVEl5VkRCU1ZGVkllR3BqU0VwM1l6STFhbHBwTlhwaFIwWjVXbGhDZG1GWE5UQk1iVTUyWWxoNGFVbFdaRXhTVjNoT1kyNUpNMWRWVlhsT2EzQlpaRVZXZGxwV1ZsUlZTRUpZV1dwbmVXSkdhRzVqVlZwTFlYcGFUVnBGTlROV1ZqbHRWREJPVjFvd2NFeE5ha3AzVVdwV1ZVNVhkekJqZWxwVVdIcENibEl3TlRoTlJFWkhVbXRHVVZFd1dUQlRSbWhEVkdzMVVGSnJTazFXVlRWQ1UxVjRWMUl3TVU1T01WWlVWbFUxVTFOUkpUTkVKVE5FSlRJeUpUSkRKVEl5YVNVeU1pVXpRU1V5TWpnNE9HWTVNall4TFRsak1XVXROR1k0WlMwNU1UYzJMV05oWWpaa05qZGlOalF6TmlVeU1pVTNSQSUzRCUzRCIsInIiOnRydWV9LCJpIjp7ImkiOiI4ODhmOTI2MS05YzFlLTRmOGUtOTE3Ni1jYWI2ZDY3YjY0MzYifX0%3D",
            icon: "fa-solid fa-box",
            text: "Planification Changements",
            type: "cpr"
        }
    }
};

// Couleurs pour chaque type de lien
const linkStyles = {
    inetum: "royalblue",
    cpr: "orange",
    other: "white"
};
