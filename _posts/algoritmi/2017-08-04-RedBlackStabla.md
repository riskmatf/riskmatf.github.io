---
layout: post
category: algoritmi
title: Crveno-Crna Stabla
meta: ovde bi trebalo napisati kratak opis teksta
---

## CRVENO-CRNA STABLA
**Crveno-crna** stabla spadaju u **samobalansirajuca** binarna stabla pretrage. Međutim, ne moraju uvek biti savršeno balansirana, tj ne mora za svaki čvor važiti da je razlika visine levog i desnog podstabla najviše 1. Ove situacije su retke, razlike nisu velike te su dozvoljene zato što ne menjaju asimptosko ponašanje operacija.

Ovim se smanjuje broj rotacija, te su često ova stabla brža od AVL stabala.


Operacije pretrage, dodavanja i brisanja elemnta iz crveno-crnog stabla su O(log(n))

**NAPOMENA**

NULL čvor koji se spominje u tekstu zapravo nije čvor već NULL pokazivač, međutim radi lakšeg razumevanja crveno-crnih stabala uzima se kao čvor.

### Pravila
1. Čvor mora biti ili crven ili crn.
2. Koren je uvek crn.
3. Ne smeju postojati dva susedna crvena čvora.
4. Svaki put od korena do NULL čvora ima isti broj crnih čvorova.
5. NULL čvor je crn.
6. Novi čvor koji se ubacuje je uvek crven.

**Crna visina** crveno-crnog stabla je broj crnih čvorova na putu od korena do NULL čvorova.

**Visina** stabla je uvek <= 2log<sub>2</sub>(n+1)

### Ubacivanje u stablo

Ubacivanje se vrši u dva koraka:

1. Klasično ubacivanje u BSP.
2. Prepravljanje stabla tako da zadovoljava pravila.
#### Prepravljanje
Za prepravljanje stabla koriste se **rotacija** i\ili **menjanje boja**.

Šta će se koristiti zavisi od boje brata roditelja(u daljem tekstu stric) trenutno razamatranog čvora.

Označimo sa :

X-trenutni čvor

O-otac od X

D-otac od O

S-drugi sin od D(može bit NULL)

Ukoliko je S **crven** radi se menjanje boja, i to:

1. Menjaju se boje O i S na crnu.
2. Menja se boja D na crvenu.
3. Da ovo menjanje boja ne bi prekršilo neko od pravila, stavljamo X=D i ponavljamo postupak prepravljanja.

Ukoliko je S **crn** rade se rotacija i menjanje boje. Razlikujemo 4 slučaja:

1. Levo levo

    O je levi sin od D, X je levi sin od O

    Radimo desnu u čvoru D i zatim menjamo boje D i O

2. Levo desno

    O je levi sin od D, X je desni sin od O.
    
    Radimo levu rotaciju u čvoru O, zatim primenimo 1.
    
3. Desno desno

    O je desni sin od D, X je desni sin od O.
    
    Radimo levu rotaciju u čvoru D i zatim menjamo bolje D i O

4. Desno levo

    O je desni sin od D, X je levi sin od O.
    
    Radimo desnu rotaciju u O, zatim primenimo 3
    
### Brisanje iz stabla

Nasuprot ubacivanju u stablo, ovde umesto boje ujaka(uncle) posmatramo boju brata(sibling) da bi utvrdili slučaj u kom se nalazimo.

Dok je kod ubacivanja najčešće bilo narušeno pravilo dva uzastopna crvena čvora, kod brisanja je najčešće narušeno pravilo da od korena do lista mora biti isti broj crnih čvorova.

Kako je brisanje relativno komplikovan proces, uvodimo pojam **duplo crnog** čvora.
**Duplo crni** čvor nastaje kada brišemo crni čvor i njega menjamo drugim crnim čvorom. Tada se, da bi crna visina stabla ostala ista, čvor kojim menjamo obrisani naziva duplo crnim. Glavni zadatak nam postaje da duplo crni čvor prebacimo da postane samo crni čvor. To radimo, kao i kod ubacivanja, rotacijama i menjanjem boja.

#### Postupak brisanja

Brisanje se odvija u dve faze:

1. Obično brisanje iz BSP

2. Prepravljanje stabla nakon brisanja


Kada vršimo obično brisanje, uvek završimo sa brisanjem čvora koji nema dece ili ima samo jedno dete. Ukoliko ima 2 deteta, menjamo sa nekim od njegovih naslednika(najmanjem u desnom podstablu ili najvećem u levom) i dalje brišemo tog naslednika.
#### Prepravljanje
Označimo čvor koji brišemo sa X, čvor kojim menjamo X sa Y i sa B brata od Y.
Kod prepravljanja, razlikujemo dva veća slučaja.

1.Ukoliko su ili X ili Y crveni, jednostavno brisanje čvora je dovoljno s obzirom da brišemo crveni čvor i neće biti promene u crnoj visini stabla.

2.Ukoliko si i X i Y crni, tada nam se javlja **duplo crni** slučaj.

1. Ukoliko je B crn i bar jedno njegovo dete je crveno, razlikujemo 4 slučaja:
Označimo sa C crveno dete od B
    1. Levo Levo
    
        Ukoliko je B levi sin svog oca i C levi sin od B ili su oba deteta od B crvena
        
    2. Levo Desno
    
        Ukoliko je B levi sin svog oca i C desni sin od B
        
    3. Desno Desno
    
        Ukoliko je B desni sin svog oca i C desni sin od B ili su oba deteta od B crvena
        
    4. Desno levo
    
        Ukoliko je B desni sin svog oca i C levi sin od B
        
2. Ukoliko je B crn i oba deteta su mu crna, promenimo boju od B na crvenu i krenemo isti postupak za roditelja.
3. Ukoliko je B crven, primenimo rotaciju da ga podignemo gore, promenimo boje njemu i roditelju i ceo postupak nastavimo sa novim B. Novi B će uvek biti crn(zato što će on biti dete starog B, ako je staro B bilo crveno njegova deca ne mogu biti), pa radimo 1 i 2 za njega. Primetimo da, pošto se ovaj slučaj svodi na prethodna dva, dobra praksa je u kodu njega prvog ispitati, pa će prirodnim tokom koda on stići do ostalih slučajeva.


**rb.h**
```c
#include <stdbool.h>

typedef struct node{
	int val;
	struct node* left;
	struct node* right;
	struct node* parrent;
	bool color;
}Node;
/*we have only two options for color, so bool fits well
macros are here just for better readability, values are not important*/

#define RED true
#define BLACK false

Node* new_node(int val);
int BST_insert(Node** root, Node* parrent, Node* new);
void insert_node(Node** root, int val);
void fix_tree_after_insert(Node** root, Node* curr);
void remove_node(Node** root, int val);
void fix_tree_after_remove(Node** root, Node* curr);

Node* rotate_left(Node*);
Node* rotate_right(Node*);

Node* find_min(Node* root);
Node* get_node(Node*root, int val);
Node* find_max(Node* root);

bool color_of(Node* node);
bool is_black(Node* node);
void swap_colors(Node* node1, Node* node2);
void set_color(Node* node, bool color);
bool is_red(Node* node);

void inorder(Node* root);


```
**rb.c**
```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include "rb.h"

Node* create_node(int val){
	Node* new_node = malloc(sizeof(Node));
	if(new_node == NULL)
		return new_node;
	new_node->val=val;
	new_node->left=new_node->right=new_node->parrent=NULL;
	new_node->color=RED;
	return new_node;
}

//this is classic insert into BST, with addition of parrent pointer
int BST_insert(Node** root, Node* parrent, Node* new){
	if(*root == NULL){
		new->parrent=parrent;
		*root=new;
		return 0;
	}
	if(new->val > (*root)->val){
		return BST_insert(&(*root)->right, *root, new);
	}
	else if(new->val < (*root)->val){
		return BST_insert(&(*root)->left, *root, new);
	}
	else
		return -1;//Value allready in BST

}

void insert_node(Node** root, int val){
	Node* new=create_node(val);
	if(BST_insert(root, NULL, new)!=0)
		printf("Value allready in BST.\n");
	else
		fix_tree_after_insert(root, new);
}

void fix_tree_after_insert(Node** root, Node* curr){
	Node* parrent_ptr=NULL;
	Node* g_parrent_ptr=NULL;

	while(curr!=*root && is_red(curr) && is_red(curr->parrent)){
		parrent_ptr=curr->parrent;
		g_parrent_ptr=parrent_ptr->parrent;
		/*  Case : A
		Parent of pt is left child of Grand-parent of pt */
		if(parrent_ptr==g_parrent_ptr->left){
			Node* uncle = g_parrent_ptr->right;
			/*
			 Case A1: uncle is red
			 Only recoloring is required
			 */
			if(uncle!=NULL && uncle->color==RED){
				g_parrent_ptr->color=RED;
				uncle->color=BLACK;
				parrent_ptr->color=BLACK;
				curr=g_parrent_ptr;//since we are in a loop, we do this so that we could check up if any problem occurred
			}
			/*
			 CaseA2
			 uncle is either NULL or BLACK, we do rotations
			 */
			else{
				if(curr==parrent_ptr->right){
					curr=rotate_left(parrent_ptr);
					g_parrent_ptr->left=curr;
					curr->parrent=g_parrent_ptr;
				}
				if(g_parrent_ptr == *root){
				*root=rotate_right(g_parrent_ptr);
				swap_colors(*root, g_parrent_ptr);
				}
				else{
					curr=rotate_right(g_parrent_ptr);
					if(curr->val>curr->parrent->val)
						curr->parrent->right=curr;
					else
						curr->parrent->left=curr;
					swap_colors(curr, g_parrent_ptr);
				}
			}
		}

		else{
			/*Case B:
			  we are in right subtree, so uncle is left
			 */
			Node* uncle = g_parrent_ptr->left;
			/*Case B1:
			uncle is red, only recoloring is required*/
			if(is_red(uncle)){
				set_color(g_parrent_ptr, RED);
				set_color(uncle, BLACK);
				set_color(parrent_ptr, BLACK);
				curr=g_parrent_ptr;
			}
			else{
				/*
				 Case B2:
				 uncle is either black or NULL, we do rotations
				 */
				if(curr==parrent_ptr->left){
					curr=rotate_right(parrent_ptr);
					g_parrent_ptr->right=curr;
				}
				if(g_parrent_ptr == *root){
					*root=rotate_left(g_parrent_ptr);
					swap_colors(*root, g_parrent_ptr);
				}
				else{
					curr=rotate_left(g_parrent_ptr);
					if(curr->val>curr->parrent->val)
						curr->parrent->right=curr;
					else
						curr->parrent->left=curr;
					swap_colors(curr, g_parrent_ptr);
					}
				}

			}
		}

	set_color(*root, BLACK);
}

void remove_node(Node** root, int val){
	Node* to_remove = get_node(*root, val);
	if(to_remove == NULL){
		printf("Value is not in BST!\n");
		return;
	}
	/*if we are deleting node with both children we copy the successor and then remove the succesor, so we
	only deal with cases when we are deletiong leaf or node that has one child*/
	else if(to_remove->left!=NULL && to_remove->right!=NULL){//case when node has both children
/*		Node* tmp = find_min(to_remove->right);
		it does not matter if we are replacing it with minimum in right subtree or maximum in left subtree
		both versions are here, test them as you like*/

		Node* tmp = find_max(to_remove->left);
		to_remove->val = tmp->val;
		to_remove=tmp;
	}
	/*if node had 0 or 1 child, we skip straight to here, if not, previous block made sure that is the case now
	so we continue to remove that one node that has 0 or 1 child*/
	Node* change = (to_remove->left == NULL) ? to_remove->right : to_remove->left;

	if(change != NULL){
		Node* parrent_ptr = to_remove->parrent;
		change->parrent = parrent_ptr;
		if(to_remove == *root){
			*root=change;
		}
		else if(parrent_ptr->left == to_remove){
			parrent_ptr->left = change;
		}
		else{
			parrent_ptr->right = change;
		}
		if(to_remove->color == BLACK)
			fix_tree_after_remove(root, change);
	}
	else if(to_remove == *root){
		*root = NULL;
	}
	else{
		if(to_remove->color == BLACK)
			fix_tree_after_remove(root, to_remove);
	}
	/*
	 *You will notice that this block is similar to one above
	The reason that these are two different cases is the implementation of fix function
	it wouldnt work properly if this was done ignoring existance of change node
	*/
	if(to_remove != *root && change == NULL){
		if(to_remove->parrent->left == to_remove)
			to_remove->parrent->left = NULL;
		else
			to_remove->parrent->right=NULL;
	}

	free(to_remove);

}

void fix_tree_after_remove(Node** root, Node* curr){
	while(curr!=*root && is_black(curr)){
		if(curr == curr->parrent->left){
			Node* parrent_ptr = curr->parrent;
			Node* sibling = parrent_ptr->right;
			if(is_red(sibling)){
				set_color(parrent_ptr, RED);
				set_color(sibling, BLACK);
				if(parrent_ptr == *root)
					*root=rotate_left(parrent_ptr);
				else{
					sibling=rotate_left(parrent_ptr);
					sibling->parrent->right=sibling;//since we know that sibling is here right child we can safely do this
				}
				sibling=parrent_ptr->right;
			}
			if(is_black(sibling->left) && is_black(sibling->right)){
				set_color(sibling, RED);
				curr=curr->parrent;
			}
			else{
				/*one or both of siblings children is red
				sibling is right child, if the right child of sibling is black that means that left child is red
				that gives us right left case which we transform in right right case*/
				if(is_black(sibling->right)){
					set_color(sibling, RED);
					set_color(sibling->left, BLACK);
					
					sibling->parrent->right = rotate_right(sibling);//since sibling cant be root, no need to check that
					sibling=curr->parrent->right;
				}
				//right right case
				set_color(sibling, color_of(curr->parrent));
				set_color(curr->parrent, BLACK);
				set_color(sibling->right, BLACK);
				if(parrent_ptr == *root){
					*root=rotate_left(parrent_ptr);
				}
				else{
					sibling=rotate_left(parrent_ptr);
					if(parrent_ptr->parrent->parrent->left == parrent_ptr){
						parrent_ptr->parrent->parrent->left = sibling;
					}
					else
						parrent_ptr->parrent->parrent->right = sibling;
				}
				curr=*root;
			}

		}
		else{
			//case when current node is right child, mirror case of case above
			Node* parrent_ptr = curr->parrent;
			Node* sibling = parrent_ptr->left;
			if(is_red(sibling)){
				set_color(sibling, BLACK);
				set_color(parrent_ptr, RED);
				//right rotate
				if(*root == parrent_ptr)
					*root=rotate_right(parrent_ptr);
				else{
					sibling=rotate_right(parrent_ptr);
					sibling->parrent->left = sibling;//we know that sibling is left
				}
				sibling=parrent_ptr->left;
			}
			if(is_black(sibling->left) && is_black(sibling->right)){
				set_color(sibling, RED);
				curr=curr->parrent;
			}
			else{
				if(is_black(sibling->left)){
					set_color(sibling->right, BLACK);
					set_color(sibling, RED);
					sibling->parrent->left=rotate_left(sibling);
					sibling=curr->parrent->left;
				}
				set_color(sibling, color_of(curr->parrent));
				set_color(curr->parrent, BLACK);
				set_color(sibling->left, BLACK);
				if(parrent_ptr == *root){
					*root = rotate_right(parrent_ptr);
				}
				else{
					sibling=rotate_right(parrent_ptr);
					if(parrent_ptr->parrent->parrent->left == parrent_ptr)
						parrent_ptr->parrent->parrent->left = sibling;
					else
						parrent_ptr->parrent->parrent->right=sibling;
				}
				curr=*root;
			}
		}

	}
	set_color(curr, BLACK);
}



Node* rotate_left(Node* curr){
	Node* tmp1=curr->right;
	Node* tmp2=tmp1->left;
	curr->right=tmp2;
	if(tmp2!=NULL)
		tmp2->parrent=curr;
	tmp1->left=curr;
	tmp1->parrent=curr->parrent;
	curr->parrent=tmp1;
	curr=tmp1;
	return curr;
}
Node* rotate_right(Node* curr){
	Node* tmp1=curr->left;
	Node* tmp2=tmp1->right;
	curr->left=tmp2;
	if(tmp2!=NULL)
		tmp2->parrent=curr;
	tmp1->right=curr;
	tmp1->parrent=curr->parrent;
	curr->parrent=tmp1;
	curr=tmp1;
	return curr;
}


Node* find_min(Node* root){
	while(root->left != NULL)
		root=root->left;
	return root;
}

Node* get_node(Node* root, int val){
	if(root == NULL)
		return NULL;
	else if(val > root->val)
		return get_node(root->right, val);
	else if(val < root->val)
		return get_node(root->left, val);
	else
		return root;
}
Node* find_max(Node* root){
	if(root == NULL)
		return NULL;
	while(root->right)
		root=root->right;
	return root;
}
void swap_colors(Node* node1, Node* node2){
	bool tmp=node1->color;
	node1->color=node2->color;
	node2->color=tmp;
}
//helper functions, here so that code would be more pleasant to read, gets rid of all the NULL checks in conditions
void set_color(Node* node, bool color){
	if(node!=NULL)
		node->color=color;
}
bool is_black(Node* node){
	return (node == NULL) ? true : node->color == BLACK;
}

bool is_red(Node* node){
	return (node == NULL) ? false : node->color == RED;
}
bool color_of(Node* node){
	return (node == NULL) ? BLACK : node->color;
}

void inorder(Node* root){
	if(root == NULL)
		return;
	inorder(root->left);
	int color = (root->color == BLACK) ? 90 : 31;
	printf("\e[1;%d;107m%d \e[0;0m\n", color,root->val);//using escape codes for nicer output
	inorder(root->right);
}

```

**main.c**
```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include "rb.h"

int main(void){

	Node* root=NULL;
	int tmp;
	while(scanf("%d", &tmp)!=EOF)
		insert_node(&root, tmp);
	inorder(root);
	printf("\nDelete: ");
	scanf("%d", &tmp);
	remove_node(&root, tmp);
	inorder(root);
	printf("\n");
	return 0;
}

```

